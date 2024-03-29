from bs4 import BeautifulSoup as bs4
import requests
import re
import json

def main():
  file_path = '../../src/data/amazonItems.json'
  amazonItems = []
  asin = input('ASIN: ')

  with open(file_path) as f:
    amazonItems = json.load(f)

  for amazonItem in amazonItems:
    if amazonItem['asin'] == asin:
      print(f'{asin} already exists.')
      exit()

  newAmazonItem = getAmazonItem(asin)
  amazonItems.append(newAmazonItem)

  with open(file_path, 'w') as f:
    json.dump(amazonItems, f, indent=2, ensure_ascii=False)

def getAmazonItem(asin):
  url = f'https://www.amazon.co.jp/dp/{asin}?tag=at946-22&linkCode=ogi&th=1&psc=1'
  res = requests.get(url)
  print(res)
  soup = bs4(res.text, 'html.parser')

  newAmazonItem = {'asin': asin}
  newAmazonItem['url'] = url
  newAmazonItem['title'] = soup.find('span', {'id': 'productTitle'}).text.strip()
  newAmazonItem['imageUrl'] = re.sub('_.*_', '_SL500_', soup.find('img', {'id': 'landingImage'})['src'])
  newAmazonItem['publisher'] = soup.find('div', {'id': 'rpi-attribute-book_details-publisher'}).findChild('div', {'class': 'rpi-attribute-value'}).text.strip()
  contributors = ''
  for author in soup.find_all('span', {'class': 'author'}):
    contributors += author.text.replace('\n','').replace(' (', '(').strip().replace(',',', ')
  newAmazonItem['contributors'] = contributors
  return newAmazonItem

if __name__ == "__main__":
  main()