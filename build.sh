# cp src/index.html dist/index.html
# cp src/index.css dist/index.css
# deno bundle src/index.ts > dist/index.js

###################
html=$(cat src/index.html)
# echo "$html"

# # echo ${html/'</body>'/capra}
js=$(deno bundle src/index.ts)
js="<script>$js</script>"

css=$(cat src/index.css)
css="<style>$css</style>"

end="$css$js</body>"

all=${html/'</body>'/$end}
# echo "$all"

rm dist/*
echo "$all" > dist/index.html


