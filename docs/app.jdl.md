# code app.jdl

```
/*
 * This is a microservice e-commerce store sample with Gateway and three microservice applications
 * This uses Istio for native kubernetes service discovery and jwt authentication
 * This also creates the required Kubernetes deployment manifests and Istio routes
 */
 
application {
  config {
    baseName store
    applicationType gateway
    packageName com.akai.developer.store
    serviceDiscoveryType no
    authenticationType jwt
    prodDatabaseType postgresql
    cacheProvider hazelcast
    buildTool gradle
    clientFramework react
  }
  entities *
}


application {
  config {
    baseName product
    applicationType microservice
    packageName com.akai.developer.product
    serviceDiscoveryType no
    authenticationType jwt
    prodDatabaseType postgresql
    cacheProvider hazelcast
    buildTool gradle
    serverPort 8081
  }
  entities Product, ProductCategory, ProductOrder, OrderItem
}

application {
  config {
    baseName invoice
    applicationType microservice
    packageName com.akai.developer.invoice
    serviceDiscoveryType no
    authenticationType jwt
    prodDatabaseType postgresql
    buildTool gradle
    serverPort 8082
  }
  entities Invoice, Shipment
}

application {
  config {
    baseName notification
    applicationType microservice
    packageName com.akai.developer.notification
    serviceDiscoveryType no
    authenticationType jwt
    databaseType mongodb
    cacheProvider no
    enableHibernateCache false
    buildTool gradle
    serverPort 8083
  }
  entities Notification
}

/**
 * Entities for Store Gateway
 */



// Customer for the store
entity Customer {
    firstName String required
    lastName String required
    gender Gender required
    email String required pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
    phone String required
    addressLine1 String required
    addressLine2 String
    city String required
    country String required
}

enum Gender {
    MALE, FEMALE, OTHER
}

relationship OneToOne {
    Customer{user(login) required} to User
}

service Customer with serviceClass
paginate Customer with pagination


/**
 * Entities for product microservice
 */


// Product sold by the Online store 
entity Product {
    name String required
    description String
    price BigDecimal required min(0)
    itemSize Size required
    image ImageBlob
}

enum Size {
    S, M, L, XL, XXL
}

entity ProductCategory {
    name String required
    description String
}

entity ProductOrder {
    placedDate Instant required
    status OrderStatus required
    code String required
    invoiceId Long
    customer String required
}

enum OrderStatus {
    COMPLETED, PENDING, CANCELLED
}

entity OrderItem {
    quantity Integer required min(0)
    totalPrice BigDecimal required min(0)
    status OrderItemStatus required
}

enum OrderItemStatus {
    AVAILABLE, OUT_OF_STOCK, BACK_ORDER
}

relationship ManyToOne {
	OrderItem{product(name) required} to Product
}

relationship OneToMany {
   ProductOrder{orderItem} to OrderItem{order(code) required} ,
   ProductCategory{product} to Product{productCategory(name)}
}

service Product, ProductCategory, ProductOrder, OrderItem with serviceClass
paginate Product, ProductOrder, OrderItem with pagination
microservice Product, ProductOrder, ProductCategory, OrderItem with product


/**
 * Entities for Invoice microservice
 */


// Invoice for sales
entity Invoice {
    code String required
    date Instant required
    details String
    status InvoiceStatus required
    paymentMethod PaymentMethod required
    paymentDate Instant required
    paymentAmount BigDecimal required
}

enum InvoiceStatus {
    PAID, ISSUED, CANCELLED
}

entity Shipment {
    trackingCode String
    date Instant required
    details String
}

enum PaymentMethod {
    CREDIT_CARD, CASH_ON_DELIVERY, PAYPAL
}

relationship OneToMany {
    Invoice{shipment} to Shipment{invoice(code) required}
}

service Invoice, Shipment with serviceClass
paginate Invoice, Shipment with pagination
microservice Invoice, Shipment with invoice


/**
 * Entities for notification microservice
 */


entity Notification {
    date Instant required
    details String
    sentDate Instant required
    format NotificationType required
    userId Long required
    productId Long required
}

enum NotificationType {
    EMAIL, SMS, PARCEL
}

microservice Notification with notification

```
# Explication du code

## I. Les microservices

### 1. Microservice Passerelle

La première partie du code concerne la configuration de la passerelle. Elle est définie comme une application de type passerelle, avec les options de configuration suivantes :

    * `baseName`: le nom de base de l'application, dans ce cas `store`.
    * `applicationType`: le type d'application, dans ce cas `gateway`.
    * `packageName`: le nom du package, dans ce cas `com.akai.developer.store`.
    * `serviceDiscoveryType`: le type de découverte de service, dans ce cas `no`.
    * `authenticationType`: le type d'authentification, dans ce cas `jwt`.
    * `prodDatabaseType`: le type de base de données, dans ce cas `postgresql`.
    * `cacheProvider`: le fournisseur de cache, dans ce cas `hazelcast`.
    * `buildTool`: l'outil de construction, dans ce cas `gradle`.
    * `clientFramework`: le framework client, dans ce cas `react`.

La passerelle est configurée pour utiliser les entités de toutes les applications. Pour ce faire, nous utilisons l'option `entities *` qui signifie que toutes les entités de toutes les applications seront utilisées.

### 2. Microservice Produit

La deuxième partie du code concerne la configuration du microservice produit. Elle est définie comme une application de type microservice, avec les options de configuration suivantes :

    * `baseName`: le nom de base de l'application, dans ce cas `product`.
    * `applicationType`: le type d'application, dans ce cas `microservice`.
    * `packageName`: le nom du package, dans ce cas `com.akai.developer.product`.
    * `serviceDiscoveryType`: le type de découverte de service, dans ce cas `no`.
    * `authenticationType`: le type d'authentification, dans ce cas `jwt`.
    * `prodDatabaseType`: le type de base de données, dans ce cas `postgresql`.
    * `cacheProvider`: le fournisseur de cache, dans ce cas `hazelcast`.
    * `buildTool`: l'outil de construction, dans ce cas `gradle`.
    * `serverPort`: le port du serveur, dans ce cas `8081`.

La passerelle est configurée pour utiliser les entités `Product`, `ProductCategory`, `ProductOrder` et `OrderItem`. Pour ce faire, nous utilisons l'option `entities Product, ProductCategory, ProductOrder, OrderItem` qui signifie que les entités `Product`, `ProductCategory`, `ProductOrder` et `OrderItem` seront utilisées.

### 3. Microservice Facture

La troisième partie du code concerne la configuration du microservice facture. Elle est définie comme une application de type microservice, avec les options de configuration suivantes :

    * `baseName`: le nom de base de l'application, dans ce cas `invoice`.
    * `applicationType`: le type d'application, dans ce cas `microservice`.
    * `packageName`: le nom du package, dans ce cas `com.akai.developer.invoice`.
    * `serviceDiscoveryType`: le type de découverte de service, dans ce cas `no`.
    * `authenticationType`: le type d'authentification, dans ce cas `jwt`.
    * `prodDatabaseType`: le type de base de données, dans ce cas `postgresql`.
    * `buildTool`: l'outil de construction, dans ce cas `gradle`.
    * `serverPort`: le port du serveur, dans ce cas `8082`.

La passerelle est configurée pour utiliser les entités `Invoice` et `Shipment`. Pour ce faire, nous utilisons l'option `entities Invoice, Shipment` qui signifie que les entités `Invoice` et `Shipment` seront utilisées.

### 4. Microservice Notification

La quatrième partie du code concerne la configuration du microservice notification. Elle est définie comme une application de type microservice, avec les options de configuration suivantes :

    * `baseName`: le nom de base de l'application, dans ce cas `notification`.
    * `applicationType`: le type d'application, dans ce cas `microservice`.
    * `packageName`: le nom du package, dans ce cas `com.akai.developer.notification`.
    * `serviceDiscoveryType`: le type de découverte de service, dans ce cas `no`.
    * `authenticationType`: le type d'authentification, dans ce cas `jwt`.
    * `prodDatabaseType`: le type de base de données, dans ce cas `postgresql`.
    * `buildTool`: l'outil de construction, dans ce cas `gradle`.
    * `serverPort`: le port du serveur, dans ce cas `8083`.

La passerelle est configurée pour utiliser l'entité `Notification`. Pour ce faire, nous utilisons l'option `entities Notification` qui signifie que l'entité `Notification` sera utilisée.

## II. Les entités

### 1. Entités pour la passerelle de microservices (Store Gateway)

**Customer**

Cette entité représente un client de la boutique en ligne et contient les informations suivantes :
    
    * `firstName`: prénom du client (obligatoire)
    * `lastName`: nom de famille du client (obligatoire)
    * `gender`: genre du client, représenté par une enum Gender (obligatoire)
    * `email`: adresse e-mail du client (obligatoire, avec une validation regex)
    * `phone`: numéro de téléphone du client (obligatoire)
    * `addressLine1`: première ligne de l'adresse du client (obligatoire)
    * `addressLine2`: deuxième ligne de l'adresse du client (optionnelle)
    * `city`: ville du client (obligatoire)
    * `country`: pays du client (obligatoire)

Elle est en relation `OneToOne` avec l'entité `User` via la propriété `user`, qui représente le compte utilisateur associé au client. Cette relation est obligatoire (required).






