mkdir ../certs

cd ../certs

openssl genrsa -out key.pem -passout pass:pAs5w0rd 2048
openssl req -new -sha256 -key key.pem -out csr.csr
openssl req -x509 -sha256 -days 365 -key key.pem  -in csr.csr -out certificate.pem
openssl pkcs12 -export -inkey key.pem -in certificate.pem -out aspnetapp.pfx

cd ../scripts