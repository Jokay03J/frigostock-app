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
        home: const Home(title: "Frigostock - Accueil"),
        theme: ThemeData(
          primarySwatch: Colors.red,
        ),
        darkTheme: ThemeData(brightness: Brightness.dark),
        themeMode: ThemeMode.system,
        routes: <String, WidgetBuilder>{
          '/newProduct': (BuildContext context) =>
              const NewProductPage(title: "Frigostock - Nouveaux Produit"),
          '/account': (BuildContext context) =>
              const Account(title: "Frigostock - Compte"),
          '/login': (BuildContext context) =>
              const Login(title: "Frigostock - Connexion"),
          '/register': (BuildContext context) =>
              const Register(title: "Frigostock - Inscription"),
        },
        title: "Frigostock",
      ),
    );
  });
}
