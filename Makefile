install:
	npm ci
publish:
	npm publish --dry-ru
lint:
	npx eslint .
test:
	npm test
test-watch:
	npm test -- --watchAll
test-coverage:
	npm test -- --coverage --coverageProvider=v8
