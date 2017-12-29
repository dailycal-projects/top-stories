import sys
import csv
import urllib2
from bs4 import BeautifulSoup

hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
       'Accept-Encoding': 'none',
       'Accept-Language': 'en-US,en;q=0.8',
       'Connection': 'keep-alive'}

def generate_new_data(partial_data_filename, full_data_filename):
    full_data_file = open(full_data_filename, 'wb')
    full_data_file.truncate()
    partial_data_file = open(partial_data_filename, 'rb')

    writer = csv.writer(full_data_file, delimiter=',', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(['Rank','Title','Link','Img Link','All topics','Breaking news','Free Speech Week','Protest coverage','Sexual misconduct','Opinion'])
    reader = csv.reader(partial_data_file, delimiter=',')
    next(reader, None)

    for row in reader:
        new_row = generate_new_row(row)
        writer.writerow(new_row)

def generate_new_row(old_row):
    local_path = old_row[1]
    link = "http://www.dailycal.org" + local_path

    req = urllib2.Request(link, headers=hdr)

    try:
        soup = BeautifulSoup(urllib2.urlopen(req).read(), "html.parser")
    except urllib2.HTTPError as e:
        print(e)
        print(link)
        title = 'UNKNOWN_TITLE'
        img_link = 'UNKNOWN_IMG_SRC'
        link = 'UNKNOWN_LINK'
        return [old_row[0], title, link, img_link] + old_row[2:]

    main_img = soup.find('img', attrs={'class':'wp-post-image'})
    if not main_img:
        print('no such image for: ' + local_path)

    title_h2 = soup.find('h2', attrs={'class':'entry-title'})
    if not title_h2:
        print('no such title for: ' + local_path)

    if title_h2 and main_img: 
        title = title_h2.text.encode('utf-8')
        img_link = main_img["src"].encode('utf-8')
    else:
        title = 'UNKNOWN_TITLE'
        img_link = 'UNKNOWN_IMG_SRC'
        link = 'UNKNOWN_LINK'

    new_row = [old_row[0], title, link, img_link] + old_row[2:]
    return new_row


def main():
    if len(sys.argv) > 2:
        partial_data_filename = sys.argv[1]
        full_data_filename = sys.argv[2]
        generate_new_data(partial_data_filename, full_data_filename)
    else:
        print('Usage: python data_getter.py [partial_data_filename] [full_data_filename]')

if __name__ == "__main__":
    main()
