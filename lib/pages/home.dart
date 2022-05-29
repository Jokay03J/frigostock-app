import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:frigostock/components/list_product.dart';

// ignore: unused_import
import 'home.dart' show Home;

class Home extends StatelessWidget {
  const Home({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: StreamBuilder<User?>(
          stream: FirebaseAuth.instance.authStateChanges(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            }
            if (snapshot.hasData) {
              return Connected(user: snapshot.data);
            }
            return const DisConnected();
          },
        ));
  }
}

// user disconnected widget
class DisConnected extends StatelessWidget {
  const DisConnected({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    void _navigator(int index) {
      switch (index) {
        case 1:
          Navigator.pushNamed(context, "/newProduct");
          break;

        case 2:
          Navigator.pushNamed(context, "/account");
          break;
      }
    }

    return Scaffold(
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
        )),
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.home_sharp),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.add_box),
              label: 'Nouveaux produit',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.account_circle),
              label: 'Account',
            ),
          ],
          currentIndex: 0,
          onTap: _navigator,
          selectedItemColor: Colors.redAccent[600],
        ));
  }
}

// user connected widget
class Connected extends StatelessWidget {
  const Connected({Key? key, required this.user}) : super(key: key);

  final User? user;

  @override
  Widget build(BuildContext context) {
    void _navigator(int index) {
      switch (index) {
        case 1:
          Navigator.pushNamed(context, "/newProduct");
          break;

        case 2:
          Navigator.pushNamed(context, "/account");
          break;
      }
    }

    return (Scaffold(
        body: ListProductPage(user: user),
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.home_sharp),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.add_box),
              label: 'Nouveaux produit',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.account_circle),
              label: 'Account',
            ),
          ],
          currentIndex: 0,
          onTap: _navigator,
          selectedItemColor: Colors.redAccent[600],
        )));
  }
}
