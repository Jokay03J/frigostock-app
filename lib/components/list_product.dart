import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class ListProductPage extends StatelessWidget {
  const ListProductPage({Key? key, required this.user}) : super(key: key);
  final User? user;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: StreamBuilder<QuerySnapshot<Map<String, dynamic>>>(
            stream:
                FirebaseFirestore.instance.collection(user!.uid).snapshots(),
            builder: ((context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              }
              if (snapshot.hasData) {
                return ListProduct(products: snapshot.data?.docs, user: user);
              }
              return const Center(child: Text("Aucun produit"));
            })));
  }
}

// ignore: camel_case_types
enum placementType { frigo, etagere, congelateur }

// ignore: must_be_immutable
class ListProduct extends StatefulWidget {
  ListProduct({Key? key, required this.products, required this.user})
      : super(key: key);

  List<QueryDocumentSnapshot<Map<String, dynamic>>>? products;
  final User? user;

  @override
  State createState() => _ListProductState();
}

class _ListProductState extends State<ListProduct> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.products!.isNotEmpty) {
      return Column(mainAxisSize: MainAxisSize.min, children: <Widget>[
        Expanded(
            child: ListView.builder(
                itemCount: widget.products?.length,
                itemBuilder: (context, index) {
                  return ListTile(
                      title: Text(widget.products![index].data()["name"]),
                      trailing: IconButton(
                          icon: const Icon(Icons.delete),
                          onPressed: () {
                            FirebaseFirestore.instance
                                .collection(widget.user!.uid)
                                .doc(widget.products![index].id)
                                .delete();
                          }),
                      subtitle: Text(
                          "X${widget.products![index].data()["amount"].toString()}"));
                })),
        Padding(
            padding: const EdgeInsets.all(8),
            child: FloatingActionButton(
                onPressed: () {
                  showDialog(
                      context: context,
                      builder: (context) {
                        return AlertDialog(
                          title: const Text("filtrer par type de produit?"),
                          content: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                IconButton(
                                  onPressed: () async {
                                    await FirebaseFirestore.instance
                                        .collection(widget.user!.uid)
                                        .get()
                                        .then((value) => {
                                              Navigator.pop(context),
                                              setState(() {
                                                widget.products = value.docs;
                                              })
                                            });
                                  },
                                  icon: const Icon(Icons.cancel),
                                ),
                                IconButton(
                                    onPressed: () async {
                                      await FirebaseFirestore.instance
                                          .collection(widget.user!.uid)
                                          .where("category", isEqualTo: "frigo")
                                          .get()
                                          .then((value) => {
                                                Navigator.pop(context),
                                                setState(() {
                                                  widget.products = value.docs;
                                                })
                                              });
                                    },
                                    icon: const Icon(Icons.fastfood)),
                                IconButton(
                                    onPressed: () async {
                                      await FirebaseFirestore.instance
                                          .collection(widget.user!.uid)
                                          .where("category",
                                              isEqualTo: "congelateur")
                                          .get()
                                          .then((value) => {
                                                Navigator.pop(context),
                                                setState(() {
                                                  widget.products = value.docs;
                                                })
                                              });
                                    },
                                    icon: const Icon(Icons.ac_unit)),
                                IconButton(
                                  onPressed: () async {
                                    await FirebaseFirestore.instance
                                        .collection(widget.user!.uid)
                                        .where("category", isEqualTo: "etagere")
                                        .get()
                                        .then((value) => {
                                              Navigator.pop(context),
                                              setState(() {
                                                widget.products = value.docs;
                                              })
                                            });
                                  },
                                  icon: const Icon(Icons.all_inbox),
                                ),
                              ]),
                          actions: [
                            ElevatedButton(
                                onPressed: () => Navigator.pop(context),
                                child: const Text("OK"))
                          ],
                        );
                      });
                },
                child: const Icon(Icons.filter_alt)))
      ]);
    } else {
      return Center(
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Text("Aucun produit", style: Theme.of(context).textTheme.headline4),
        ElevatedButton(
          child: const Text("Ajouter un produit"),
          onPressed: () {
            Navigator.pushNamed(context, "/newProduct");
          },
        ),
        Padding(
            padding: const EdgeInsets.all(8),
            child: FloatingActionButton(
                onPressed: () {
                  showDialog(
                      context: context,
                      builder: (context) {
                        return AlertDialog(
                          title: const Text("filtrer par type de produit?"),
                          content: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                IconButton(
                                  onPressed: () async {
                                    await FirebaseFirestore.instance
                                        .collection(widget.user!.uid)
                                        .get()
                                        .then((value) => {
                                              Navigator.pop(context),
                                              setState(() {
                                                widget.products = value.docs;
                                              })
                                            });
                                  },
                                  icon: const Icon(Icons.cancel),
                                ),
                                IconButton(
                                    onPressed: () async {
                                      await FirebaseFirestore.instance
                                          .collection(widget.user!.uid)
                                          .where("category", isEqualTo: "frigo")
                                          .get()
                                          .then((value) => {
                                                Navigator.pop(context),
                                                setState(() {
                                                  widget.products = value.docs;
                                                })
                                              });
                                    },
                                    icon: const Icon(Icons.fastfood)),
                                IconButton(
                                    onPressed: () async {
                                      await FirebaseFirestore.instance
                                          .collection(widget.user!.uid)
                                          .where("category",
                                              isEqualTo: "congelateur")
                                          .get()
                                          .then((value) => {
                                                Navigator.pop(context),
                                                setState(() {
                                                  widget.products = value.docs;
                                                })
                                              });
                                    },
                                    icon: const Icon(Icons.ac_unit)),
                                IconButton(
                                  onPressed: () async {
                                    await FirebaseFirestore.instance
                                        .collection(widget.user!.uid)
                                        .where("category", isEqualTo: "etagere")
                                        .get()
                                        .then((value) => {
                                              Navigator.pop(context),
                                              setState(() {
                                                widget.products = value.docs;
                                              })
                                            });
                                  },
                                  icon: const Icon(Icons.all_inbox),
                                ),
                              ]),
                          actions: [
                            ElevatedButton(
                                onPressed: () => Navigator.pop(context),
                                child: const Text("OK"))
                          ],
                        );
                      });
                },
                child: const Icon(Icons.filter_alt)))
      ]));
    }
  }
}
