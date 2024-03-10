#!/bin/bash

echo -n "title: "
read title
title="${title// /-}"
directory=src/content/blog/$(date "+%Y%m%d")-$title
file=$directory/index.mdoc
mkdir $directory
touch $file
cat >$file <<EOL
---
title: $title
tags:
publicationDate: $(date "+%Y-%m-%d")
isPublished: false
---

EOL