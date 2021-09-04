import json as JSON

f = open(".\src\modules\data.json", "r", encoding="utf8")

index = JSON.loads(f.read())

f.close()

for i in index.keys():
    print(index[i])
    index[i]["gamemodes"] = index[i]["gamemodes"].split(",")
    index[i]["goal"] = index[i]["goal"].split(",")
    index[i]["gamemechanics"] = index[i]["gamemechanics"].split(",")
    index[i]["theme"] = index[i]["theme"].split(",")
    index[i]["language"] = index[i]["language"].split(",")
    index[i]["communication"]

f = open(".\src\modules\data.json", "w")
f.write(JSON.dumps(index, indent=4))
f.close()