if [ -z "$(git status --porcelain)" ]; then
  yarn route-grabber && \
  NODE_ENV=production yarn build && \
  git checkout gh-pages && \
  git rm -rf . && \
  mv dist/* ./ && \
  mv seo/* ./ && \
  git checkout master -- .gitignore && \
  echo 'together.corylogan.com' >> CNAME && \
  git add . && \
  git commit -am 'rev' && \
  git push origin gh-pages  && \
  git checkout master
else
  echo "You have uncommited changes. Skipping deploy!"
fi
