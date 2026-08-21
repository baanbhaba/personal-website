import asyncio
import random
import sys
from playwright.async_api import async_playwright

TARGET_URL = "https://baanbhaba.dev/"
TOTAL_VISITS = 100
CONCURRENCY = 6

USER_AGENTS = [
    # Desktop Chrome / Mac / Windows / Linux
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    # Safari Mac
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    # Firefox
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0",
    # Mobile iOS / Android
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.85 Mobile Safari/537.36",
]

REFERRERS = [
    "https://www.google.com/",
    "https://github.com/",
    "https://twitter.com/",
    "https://www.linkedin.com/",
    "https://news.ycombinator.com/",
    "https://duckduckgo.com/",
    "",  # Direct
]

VIEWPORTS = [
    {"width": 1920, "height": 1080},
    {"width": 1440, "height": 900},
    {"width": 1536, "height": 864},
    {"width": 1280, "height": 720},
    {"width": 393, "height": 852},
    {"width": 412, "height": 915},
]

completed_count = 0
lock = asyncio.Lock()

async def worker(worker_id: int, queue: asyncio.Queue, browser):
    global completed_count
    while True:
        visit_idx = await queue.get()
        if visit_idx is None:
            break
        
        ua = random.choice(USER_AGENTS)
        referrer = random.choice(REFERRERS)
        viewport = random.choice(VIEWPORTS)

        context = await browser.new_context(
            user_agent=ua,
            viewport=viewport,
            extra_http_headers={"Referer": referrer} if referrer else {}
        )
        page = await context.new_page()

        try:
            await page.goto(TARGET_URL, wait_until="networkidle", timeout=30000)
            
            scroll_pos = random.randint(300, 1200)
            await page.evaluate(f"window.scrollTo(0, {scroll_pos})")
            await asyncio.sleep(random.uniform(1.0, 2.0))
            
            await page.mouse.move(random.randint(50, 400), random.randint(50, 400))
            await asyncio.sleep(random.uniform(0.5, 1.0))
            
            async with lock:
                completed_count += 1
                sys.stdout.write(f"\r[Progress: {completed_count}/{TOTAL_VISITS}] Visit #{visit_idx+1} recorded ({referrer or 'Direct'})")
                sys.stdout.flush()
        except Exception as e:
            async with lock:
                completed_count += 1
                sys.stdout.write(f"\r[Progress: {completed_count}/{TOTAL_VISITS}] Visit #{visit_idx+1} finished ({type(e).__name__})")
                sys.stdout.flush()
        finally:
            await page.close()
            await context.close()
            queue.task_done()

async def main():
    print(f"Starting generation of {TOTAL_VISITS} visits to {TARGET_URL}...")
    queue = asyncio.Queue()
    for i in range(TOTAL_VISITS):
        await queue.put(i)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        tasks = []
        for w_id in range(CONCURRENCY):
            t = asyncio.create_task(worker(w_id, queue, browser))
            tasks.append(t)
        
        await queue.join()

        for _ in range(CONCURRENCY):
            await queue.put(None)
        await asyncio.gather(*tasks)

        await browser.close()

    print(f"\nCompleted {completed_count} visits to {TARGET_URL} successfully!")

if __name__ == "__main__":
    asyncio.run(main())
