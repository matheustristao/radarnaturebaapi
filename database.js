const MongoClient = require('mongodb').MongoClient,
    config = require('config');
'use strict';

const server = config.get('database.server'),
    port = config.get('database.port'),
    database = config.get('database.database'),
    url = "mongodb://" + server + ":" + port + "/" + database;

module.exports = {

    returnListaProdutoCategoria: function (idCategoria) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db(database);

                dbo.collection("produtos").find({ "idCategoria": idCategoria }).toArray(function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        db.close();
                        console.log(JSON.stringify(result));
                        resolve(result);
                    }
                });

            });


        });
    },

    returnListaProdutos: function (nome) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db(database);

                dbo.collection("produtos").find(
                    {
                        "nomeProduto": new RegExp(nome, "i")
                    },
                    {
                        projection:
                        {
                            _id: 0
                        }
                    }).toArray(
                        function (err, result) {
                            if (err) {
                                reject(err)
                            } else {
                                db.close();
                                console.log(JSON.stringify(result));
                                resolve(result);
                            }
                        });
            });

        });
    },

    returnProdutoDetail: function (idProduto) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db(database);

                dbo.collection("produtos").findOne(
                    {
                        "idProduto": parseInt(idProduto)
                    },
                    {
                        projection:
                        {
                            _id: 0
                        }
                    },
                    function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            db.close();
                            console.log(JSON.stringify(result));
                            resolve(result);
                        }
                    });
            });

        });
    },

    returnListaLoja: function (nome) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db(database);

                dbo.collection("lojas").find(
                    {
                        "nomeLoja": new RegExp(nome, "i")
                    },
                    {
                        projection:
                        {
                            _id: 0
                        }
                    }).toArray(
                        function (err, result) {
                            if (err) {
                                reject(err)
                            } else {
                                db.close();
                                console.log(JSON.stringify(result));
                                resolve(result);
                            }
                        });
            });

        });
    },

    returnLoja: function (idProduto) {

        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db(database);

                dbo.collection("lojas").find(
                    {
                        "produtos": parseInt(idProduto)
                    },
                    {
                        projection:
                        {
                            _id: 0
                        }
                    }).toArray(
                        function (err, result) {
                            if (err) {
                                reject(err)
                            } else {
                                db.close();
                                console.log(JSON.stringify(result));
                                resolve(result);
                            }
                        });
            });

        });
    },

    returnLojaDetail: function (idLoja) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db(database);

                dbo.collection("lojas").findOne(
                    {
                        "idLoja": parseInt(idLoja)
                    },
                    {
                        projection:
                        {
                            _id: 0
                        }
                    },
                    function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            db.close();
                            console.log(JSON.stringify(result));
                            resolve(result);
                        }
                    });
            });

        });
    },

    returnProdutosLoja: function (arrayProdutos) {
        var transformedArrayProdutos = new Array();

        transformedArrayProdutos = arrayProdutos.split(",");

        for (var i = 0; i < transformedArrayProdutos.length; i++) {
            transformedArrayProdutos[i] = parseInt(transformedArrayProdutos[i]);
        }

        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db(database);

                dbo.collection("produtos").find(
                    {
                        "idProduto": { "$in": transformedArrayProdutos }
                    },
                    {
                        projection:
                        {
                            _id: 0
                        }
                    }).toArray(
                        function (err, result) {
                            if (err) {
                                reject(err)
                            } else {
                                db.close();
                                console.log(JSON.stringify(result));
                                resolve(result);
                            }
                        });
            });

        });
    }

}