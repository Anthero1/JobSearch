from bs4 import BeautifulSoup
import requests
import re
import math

search_term = input("What job type do you want to search for? ")	#change spaces to +
search_term.replace(' ', '+')

province_search = input("Which province should we search for?")		#should be a selection
city_search = input("Which city should we search for?")
distance_from = input("How far (km)?")		#0, 5, 10, 25, 50, 100

url = f"https://ca.indeed.com/jobs?q={search_term}&l={city_search}%2C+{province_search}&radius={distance_from}&filter=0"
page = requests.get(url).text
doc = BeautifulSoup(page, "html.parser")

page_text = doc.find(id="searchCountPages").text
total_jobs = int(str(page_text).split("jobs")[0].split("of")[-1].strip().replace(',', ''))
pages = math.ceil(total_jobs / 15)
pages_converted = 10 * pages - 10

jobs_found = {}

for page in range(0, 10, 10): #change 20 to pages_converted, but there's too many pages, so I made back to 20 (page 3, 45 job listings). you can change this number, but be warned that there's a shit ton of job listings so that might be annoying to deal with & i don't want to flood the webpage
	url = f"https://ca.indeed.com/jobs?q={search_term}&l={city_search}%2C+{province_search}&radius={distance_from}&filter=0&start={page}"
	page = requests.get(url).text
	doc = BeautifulSoup(page, "html.parser")

	job_list = doc.find(class_="jobsearch-ResultsList css-0")

	for job in job_list:
		try:
			try:
				job_title = job.find(class_="jobTitle jobTitle-newJob css-bdjp2m eu4oa1w0").text
			except:
				try:
					job_title = job.find(class_="jobTitle css-1h4a4n5 eu4oa1w0").text
				except:
					pass
			link = 'ca.indeed.com' + job.find(name="a")['href']
			try:
				ratings = job.find(class_="ratingNumber").text
			except:
				ratings = 'N/A'
			location = job.find(class_="companyLocation").text
			job_description = []

			job_description_area = job.find(style="list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;")

			for job_snippet in job_description_area:
				job_description.append(job_snippet.text.strip())

			for i in job_description:
					while '' in job_description:
						job_description.remove('')

			jobs_found[job_title] = {"location": location, "job description": job_description, "ratings": ratings, "job link": link}

		except:
			pass

sorted_jobs = sorted(jobs_found.items(), key=lambda x: x[1]['ratings'])

for job in sorted_jobs:
	print(job[0])
	print('Rated ' + job[1]['ratings'] + " stars")
	print(job[1]['location'] + '\n')
	print('Job description:')
	for item in job[1]['job description']:
		print(item)
	print('\nLink: ' + job[1]['job link'])
	print("\n----------------------\n")

#for key in jobs_found:
    #print('\n' + key)
    #print('Ratings: ' + jobs_found.get(key)['ratings'] + ' stars')
    #print('Location: '+ jobs_found.get(key)['location'])
    #print('\nJob Description:')
    #for item in jobs_found.get(key)['job description']:
    	#print(item)
    #print('\nJob Link:' + jobs_found.get(key)['job link'])
    #print('\n-------------------------------------')