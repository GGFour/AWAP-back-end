import csv
import json
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--input')
    args = parser.parse_args()

    data = []
    with open(args.input, 'r') as infile:
        fieldnames = infile.readline().split(';')
        reader = csv.DictReader(infile, fieldnames=fieldnames, delimiter=';')
        for row in reader:
            year = row['MtCyr']
            for k, v in row.items():
                if k == 'MtCyr':
                    continue
                if v == '':
                    v = 0
                item = {}
                item['year'] = year
                item['country'] = k
                item['CO2_Mt'] = int(v)*3.664
                data.append(item)
    with open ('vis8.json', 'w') as outfile:
        json.dump(data, outfile)

    exit(0)