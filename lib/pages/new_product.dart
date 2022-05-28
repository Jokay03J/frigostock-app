import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';

// ignore: unused_import
import 'new_product.dart' show NewProduct;

class NewProductPage extends StatelessWidget {
  const NewProductPage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  Widget build(BuildContext context) {
    return (StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        // check if user data is pending
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        //check if user is connected and pass user data to the next page
        if (snapshot.hasData) {
          return NewProduct(
            user: snapshot.data,
            title: title,
          );
        }
        // user not connected
        return Scaffold(
            appBar: AppBar(
              title: Text(title),
            ),
            body: Center(
                child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  "Non connecté",
                  style: Theme.of(context).textTheme.headline4,
                ),
                ElevatedButton(
                  child: const Text('se connecter'),
                  onPressed: () {
                    Navigator.pushNamed(context, "/login");
                  },
                ),
                ElevatedButton(
                  child: const Text("s'inscrire"),
                  onPressed: () {
                    Navigator.pushNamed(context, "/register");
                  },
                ),
              ],
            )));
      },
    ));
  }
}

enum PlacementType { frigo, etagere, congelateur }

class NewProduct extends StatefulWidget {
  const NewProduct({Key? key, required this.title, required this.user})
      : super(key: key);

  final String title;
  final User? user;

  @override
  State createState() => _NewProductState();
}

class _NewProductState extends State<NewProduct> {
  String _scanBarcode = "";
  final _formKey = GlobalKey<FormState>();
  PlacementType _placement = PlacementType.frigo;
  TextEditingController nameController = TextEditingController();
  TextEditingController amountController = TextEditingController();

// dispose controller for best optimization
  @override
  void dispose() {
    nameController.dispose();
    amountController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
  }

  // Platform messages are asynchronous, so we initialize in an async method.
  Future<void> scanBarcodeNormal() async {
    String barcodeScanRes;
    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      barcodeScanRes = await FlutterBarcodeScanner.scanBarcode(
          '#ff6666', 'Annuler', true, ScanMode.BARCODE);
      final Response food = await Dio().get(
          "https://world.openfoodfacts.org/api/v0/product/$barcodeScanRes.json");
      if (food.data["product"]["generic_name_fr"] != null) {
        setState(() {
          nameController.text = food.data['product']['generic_name_fr'];
        });
      }
    } on PlatformException {
      barcodeScanRes = 'Failed to get platform version.';
    }

    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) return;

    setState(() {
      _scanBarcode = barcodeScanRes;
    });
  }

  Future submit() async {
    // check all controller are valid
    if (_formKey.currentState!.validate()) {
      try {
        var data = <String, dynamic>{
          "amount": amountController.text,
          "name": nameController.text,
          "category": _placement.name
        };

        FirebaseFirestore.instance
            .collection(widget.user!.uid)
            .add(data)
            .then((DocumentReference doc) => Navigator.pop(context));
      } catch (error) {
        // error dialog
        showDialog(
            context: context,
            builder: (context) {
              return (AlertDialog(
                  title: const Text("Erreur"),
                  content: const Text("Une erreur est survenue"),
                  actions: [
                    ElevatedButton(
                      child: const Text("OK"),
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                    )
                  ]));
            });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: SingleChildScrollView(
            child: Center(
                child: Column(
          children: <Widget>[
            // scanner button
            ElevatedButton(
                onPressed: () => scanBarcodeNormal(),
                child: const Text('Scanner')),
            //barcode result
            Text(_scanBarcode),
            Form(
                key: _formKey,
                child: Column(children: <Widget>[
                  // name input
                  Padding(
                    padding: const EdgeInsets.all(8),
                    child: TextFormField(
                      controller: nameController,
                      textAlign: TextAlign.center,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'nom du produit',
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'nom requis';
                        }
                        return null;
                      },
                    ),
                  ),
                  // amount input
                  Padding(
                    padding: const EdgeInsets.all(8),
                    child: TextFormField(
                      inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                      controller: amountController,
                      textAlign: TextAlign.center,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Quantité',
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'quantité requise';
                        }
                        return null;
                      },
                    ),
                  ),
                  // select placement
                  //frigo
                  Padding(
                      padding: const EdgeInsets.only(
                          left: 8, right: 8, bottom: 2, top: 2),
                      child: ListTile(
                          title: const Text("frigo"),
                          leading: Radio<PlacementType>(
                              value: PlacementType.frigo,
                              groupValue: _placement,
                              onChanged: (PlacementType? value) {
                                setState(() {
                                  _placement = value!;
                                });
                              }))),
                  //congélateur
                  Padding(
                      padding: const EdgeInsets.only(
                          left: 8, right: 8, bottom: 2, top: 2),
                      child: ListTile(
                          title: const Text("congélateur"),
                          leading: Radio<PlacementType>(
                              value: PlacementType.congelateur,
                              groupValue: _placement,
                              onChanged: (PlacementType? value) {
                                setState(() {
                                  _placement = value!;
                                });
                              }))),
                  Padding(
                      padding: const EdgeInsets.only(
                          left: 8, right: 8, bottom: 2, top: 2),
                      child: ListTile(
                          title: const Text("étagère"),
                          leading: Radio<PlacementType>(
                              value: PlacementType.etagere,
                              groupValue: _placement,
                              onChanged: (PlacementType? value) {
                                setState(() {
                                  _placement = value!;
                                });
                              }))),
                ])),
            // submit button
            ElevatedButton(
                onPressed: () => submit(), child: const Text('Soumettre'))
          ],
        ))));
  }
}
