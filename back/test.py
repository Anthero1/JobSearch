import sys

from bs4 import BeautifulSoup
import requests
import re
import math
import json

output = []
search_term = sys.argv[1]	#change spaces to +
search_term.replace(' ', '+')

province_search = "ontario"		#should be a selection
city_search = "ottawa"
distance_from = "10"		#0, 5, 10, 25, 50, 100

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
    output.append(job[0])
    output.append('Rated ' + job[1]['ratings'] + " stars")
    output.append(job[1]['location'])
    output.append('Job description:')
    for item in job[1]['job description']:
        output.append(item)
    output.append('Link: ' + job[1]['job link'])
        

    
x =  json.loads('{}')

# Format output as json
for count, job in enumerate(sorted_jobs):
    temp =  json.loads('{}')
    temp.update({"job":job[0]})
    temp.update({"rating": 'Rated ' + job[1]['ratings'] + " stars"})
    temp.update({location: job[1]['location']})
    descript = []
    for item in job[1]['job description']:
        descript.append(item)
    temp.update({"description": descript})

    temp.update({link: 'Link: ' + job[1]['job link']})
    y = {str(count): temp}
    x.update(y)

    

print(json.dumps(x))

sys.stdout.flush