from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time

# Specify the path to your ChromeDriver executable
driver_path = 'C:/Users/Acer/chromedriver_win32/chromedriver.exe'

# Chrome options for headless mode (optional)
options = Options()
options.add_argument('--disable-gpu')  # Disable GPU acceleration
options.add_argument('--headless')  # Run in headless mode, i.e., without a GUI

# Initialize the WebDriver
try:
    service = Service(executable_path=driver_path)
    driver = webdriver.Chrome(service=service, options=options)
except Exception as e:
    print(f"Error initializing WebDriver: {e}")
    driver = None

if driver:
    try:
        # Navigate to Google Maps
        driver.get("https://www.google.com/maps")

        # Wait for the search bar to be available
        search_bar = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[aria-label='Search Google Maps']"))
        )

        # Search for restaurants in California
        search_bar.send_keys("restaurants in California")
        search_bar.send_keys(Keys.RETURN)

        # Wait for the results to load
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".section-layout__content"))
        )

        # Scroll down to load more results (optional)
        while True:
            try:
                load_more_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, ".section-layout-root .section-load-more-button"))
                )
                load_more_button.click()
                time.sleep(2)  # Adding a small delay to let new results load
            except Exception as e:
                print(f"Error clicking 'Load more' button: {e}")
                break

        # Scrape restaurant data
        restaurants = []

        # Find all restaurant elements
        restaurant_elements = driver.find_elements(By.CSS_SELECTOR, ".section-result")

        for restaurant in restaurant_elements:
            try:
                name = restaurant.find_element(By.CSS_SELECTOR, ".section-result-title span").text.strip()
                address = restaurant.find_element(By.CSS_SELECTOR, ".section-result-address").text.strip()
                rating = restaurant.find_element(By.CSS_SELECTOR, ".cards-rating-score").text.strip()
                reviews_count = restaurant.find_element(By.CSS_SELECTOR, ".section-result-num-ratings").text.strip()
                restaurants.append({"Name": name, "Address": address, "Rating": rating, "Reviews Count": reviews_count})
            except Exception as e:
                print(f"Error scraping restaurant data: {e}")

        # Create a DataFrame to store the scraped data
        df = pd.DataFrame(restaurants)
        print(df)

        # Save the data to a CSV file
        df.to_csv('restaurants_in_california.csv', index=False)

    except Exception as e:
        print(f"Error during scraping: {e}")

    finally:
        # Close the WebDriver
        driver.quit()
else:
    print("WebDriver not initialized.")

