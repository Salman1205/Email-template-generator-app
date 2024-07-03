from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from openpyxl import Workbook

# Set up the WebDriver (update driver_path with your ChromeDriver path)
driver_path = 'C:/Users/Acer/chromedriver_win32/chromedriver.exe'
service = Service(executable_path=driver_path)
driver = webdriver.Chrome(service=service)

# Specify the URL of the website to scrape
url = 'https://company.e-resident.gov.ee/'
driver.get(url)

# Wait for the page to load completely
wait = WebDriverWait(driver, 5)  # Adjust timeout as needed

try:
    # Accept cookies if there's an 'Accept' button
    accept_cookies_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Accept')]")))
    accept_cookies_button.click()
except Exception as e:
    print(f"Exception occurred while accepting cookies: {e}")

try:
    # Wait for the company cards container to load
    company_cards_container = wait.until(EC.presence_of_element_located((By.XPATH, "//div[@class='company-cards']")))

    # Create an Excel workbook
    workbook = Workbook()
    worksheet = workbook.active
    worksheet.append(['Name', 'Registration Number', 'Status', 'Registered Address', 'Website', 'Contact Person', 'Nationality'])

    # Find all company cards
    company_cards = company_cards_container.find_elements(By.XPATH, ".//div[@class='company-card']")

    # Loop through each company card and extract data
    for company_card in company_cards:
        name = company_card.find_element(By.XPATH, ".//h3").text.strip()
        reg_num = company_card.find_element(By.XPATH, ".//p[contains(text(), 'Registration number')]/following-sibling::p").text.strip()
        status = company_card.find_element(By.XPATH, ".//p[contains(text(), 'Status')]/following-sibling::p").text.strip()
        address = company_card.find_element(By.XPATH, ".//p[contains(text(), 'Registered address')]/following-sibling::p").text.strip()
        website = company_card.find_element(By.XPATH, ".//a[contains(@class, 'company-link')]").get_attribute('href')

        # Extract contact person and nationality if available
        contact_person = ''
        nationality = ''
        try:
            contact_person_element = company_card.find_element(By.XPATH, ".//p[contains(text(), 'Contact person')]/following-sibling::p/a")
            contact_person = contact_person_element.text.strip()
            nationality_icon = contact_person_element.find_element(By.XPATH, './preceding-sibling::span')
            nationality = nationality_icon.get_attribute('title')
        except:
            pass  # Handle if contact person or nationality not found

        # Append data to worksheet
        worksheet.append([name, reg_num, status, address, website, contact_person, nationality])

    # Save Excel file
    workbook.save('e_resident_companies.xlsx')

    print("Data successfully scraped and saved to 'e_resident_companies.xlsx'")

except Exception as e:
    print(f"Exception occurred during scraping: {e}")

finally:
    # Close the WebDriver
    driver.quit()
