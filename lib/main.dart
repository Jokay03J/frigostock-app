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
    runApp(const App());
  });
}

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  _App createState() => _App();

  static _App? of(BuildContext context) =>
      context.findAncestorStateOfType<_App>();
}

class _App extends State<App> {
  ThemeMode _themeMode = ThemeMode.system;
  int SelectedIndex = 0;

  Future<void> changeTheme(int themeMode) async {
    switch (themeMode) {
      case 0:
        setState(() {
          SelectedIndex = 0;
          _themeMode = ThemeMode.system;
        });
        break;
      case 1:
        setState(() {
          SelectedIndex = 1;
          _themeMode = ThemeMode.dark;
        });
        break;
      case 2:
        setState(() {
          SelectedIndex = 2;
          _themeMode = ThemeMode.light;
        });
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const Home(title: "Frigostock - Accueil"),
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      darkTheme: ThemeData(brightness: Brightness.dark),
      themeMode: _themeMode,
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
    );
  }
}
