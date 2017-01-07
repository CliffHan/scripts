#!/bin/bash
### this script parse bing today image url from bing json ###

function jsonval {
    temp=`echo $json | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $prop`
    echo ${temp##*|}
}

bing_img_json_url="http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"
json=`curl -s $bing_img_json_url`
prop='url'
picurl=`jsonval`

echo "http://www.bing.com$picurl"

### download it if you want
#`curl -s -X GET $picurl -o $1.jpg`

