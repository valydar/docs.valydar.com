IMAGE = valydar-docs
KIND_CLUSTER = valydar

.PHONY: build serve docker deploy clean

build:
	npm run build

serve: build
	npx serve build -l 3001

docker:
	docker build -t $(IMAGE):dev .

deploy: docker
	kubectl create namespace docs --dry-run=client -o yaml | kubectl apply -f -
	kind load docker-image $(IMAGE):dev --cluster $(KIND_CLUSTER)
	kubectl apply -f kind/k8s/ -n docs
	kubectl rollout restart deployment/valydar-docs -n docs

clean:
	rm -rf build .docusaurus node_modules
