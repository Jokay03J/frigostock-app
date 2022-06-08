import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:frigostock/main.dart';

// ignore: unused_import
import "account.dart" show Account;

class Account extends StatefulWidget {
  const Account({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State createState() => _AccountState();
}

class _AccountState extends State<Account> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
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
      ),
    );
  }
}

class Connected extends StatefulWidget {
  const Connected({Key? key, required this.user}) : super(key: key);

  final User? user;

  @override
  State createState() => _Connected();
}

class _Connected extends State<Connected> {
  bool theme = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
            child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        const Text(
          'connecté en tant que',
        ),
        Text(
          '${widget.user?.email}',
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        ElevatedButton(
          child: const Text('se déconnecter'),
          onPressed: () {
            FirebaseAuth.instance.signOut();
            Navigator.pop(context);
          },
        ),
        Padding(
            padding: const EdgeInsets.all(8),
            child: Center(
                child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const Text("Theme"),
                IconButton(
                    onPressed: () {
                      App.of(context)?.changeTheme(1);
                    },
                    icon: const Icon(Icons.dark_mode_outlined)),
                IconButton(
                    onPressed: () {
                      App.of(context)?.changeTheme(2);
                    },
                    icon: const Icon(Icons.lightbulb_outlined)),
              ],
            ))),
      ],
    )));
  }
}

class DisConnected extends StatelessWidget {
  const DisConnected({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
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
    );
  }
}
