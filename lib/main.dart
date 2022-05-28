import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:frigostock/pages/account.dart';
import 'package:frigostock/pages/home.dart';
import 'package:frigostock/pages/login.dart';
import 'package:frigostock/pages/new_product.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:frigostock/pages/register.dart';
import 'firebase_options.dart';

//main is a function that runs when the app starts
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]).then((_) {
    runApp(
      MaterialApp(
        home: const Home(title: "frigostock - Accueil"),
        theme: ThemeData(
          primarySwatch: Colors.red,
        ),
        routes: <String, WidgetBuilder>{
          '/newProduct': (BuildContext context) =>
              const NewProductPage(title: "frigostock - Nouveau Produit"),
          '/account': (BuildContext context) =>
              const Account(title: "frigostock - Compte"),
          '/login': (BuildContext context) =>
              const Login(title: "frigostock - Connexion"),
          '/register': (BuildContext context) =>
              const Register(title: "frigostock - Inscription"),
        },
      ),
    );
  });
}
