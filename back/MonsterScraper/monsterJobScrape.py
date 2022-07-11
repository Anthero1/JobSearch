#change the search options (jobTitle, city, state) to look for different job listings
#info is saved in the "info" array
#temp.html has to be in same directory as monsterJobScrape.py
#requires chromedriver to be in same directory aswell

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

#selenium settings to run without opening a browser window
chromeOptions = Options()
chromeOptions.headless = True

#search options
jobTitle="Marketing+Manager" #put "+" instead of spaces
city="Ottawa"
state="ON" #two or three letter abreviation is ideal, but full name will usually work, also, it can be a region, province, etc.

#fetches the web html
url = 'https://www.monster.com/jobs/search?q='+jobTitle+'&where='+city+'%2C+'+state+'&page=1&so=m.s.sh'
webdriver = webdriver.Chrome(options=chromeOptions)
webdriver.get(url)
time.sleep(2)
html_content = webdriver.page_source
webdriver.close()
soup = BeautifulSoup(html_content, 'html.parser')

#outputs the html into a file
with open("temp.html", 'wt', encoding='utf-8') as html_file:
    for line in soup.prettify():
        html_file.write(line)

#initializes information holding array
#([job title][copmany name][location][salary][link])
w, h = 5, 9
info = [[0 for x in range(w)] for y in range(h)] 


#retrieves links
i = 0
for link in soup.find_all('a', href=True):
    if i>14 and i<24:
        info[i-15][4]=link['href'][2:]
    i+=1
#retrieves job titles
i=0
for text in soup.find_all("div", {"class": "job-cardstyle__JobCardTitle-sc-1mbmxes-2 hwZGwa"}):
    info[i][0]=text.text
    i+=1
#retrieves company name
i=0
for text in soup.find_all("h3", {"class": "job-cardstyle__JobCardCompany-sc-1mbmxes-3 iYiJvS"}):
    info[i][1]=text.text
    i+=1
#retrieves location and salary (same html class so it is done in one loop)
i=0
for text in soup.find_all("p", {"class": "job-cardstyle__JobCardDetails-sc-1mbmxes-5 ejlalk"}):
    if i%2==0:
        info[round(i/2)][2]=text.text
    else:
        info[round((i-1)/2)][3]=text.text
    i+=1


while info.count([0,0,0,0,0])>0:
    info.remove([0,0,0,0,0])

with open("temp.html", 'wt', encoding='utf-8') as html_file:
    html_file.truncate(0)

#prints info
i=0
for temp in info:
    print("job #",i+1)
    print("Job Title:", info[i][0])
    print("Company:", info[i][1])
    print("Location:", info[i][2])
    print("Salary:", info[i][3])
    print("link:", info[i][4])
    print("--------------------")
    i+=1

