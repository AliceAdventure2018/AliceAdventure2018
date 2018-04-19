import glob
import os.path

FOLDER = "C:/Users/jiajunl2/Documents/AliceAdventure2018/AliceAdventure/app/Assets/item/*.png"
filelist = glob.glob(FOLDER)


for i in filelist:
    i = i.replace("C:/Users/jiajunl2/Documents/AliceAdventure2018/AliceAdventure/app/", "../../")
    i = i.replace('\\', "/")

    filename = os.path.basename(i).replace('_',' ')
    filename = filename.capitalize()
    filename = filename[0:-4]

    result_string = "{name:\'" + filename +"\', src:\'" + i +"\'},"
    print (result_string)