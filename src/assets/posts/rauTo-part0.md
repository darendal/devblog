# Writing a TAR util in Rust
## Part 0: Intros and Setups

### Introduction

Starting this project, my goal was to create a simple Rust command line util that can both create and extract TAR files. Tar files are ubiquitous in Linux/Unix/MacOS, and were originally created as a way to easily store multiple files on a tape record. 

While not many people use actual tape drives any more (unless you're [Google](https://qz.com/1561878/google-amazon-and-microsoft-turn-to-magnetic-tape-storage-technology-to-back-up-their-clouds/), apparently), tar files or 'tarballs' are an easy way to combine a bunch of files and share them, or back them up using some more conventional means.

I used the [GNU tar spec](https://www.gnu.org/software/tar/manual/html_node/Standard.html), which lists all the various flags and options of a TAR file. As this is a basic utility, I've only implemented the bare minimum.

### Caveat

Before we get into it, a few caveats. First, I make no promises this works on Windows. In fact, I can pretty much promise you it *won't* work on Windows. Tarfiles have embedded Unix permission flags (more info [here](https://en.wikipedia.org/wiki/File-system_permissions#Traditional_Unix_permissions)), which Windows doesn't have/use. While the spec says that on an OS without them they can be ignored, I ignored the spec.

### Getting Started

With that out of the way, we can get started on our Rust Archive Util (or rau for short).
To start, we need a new Rust binary. We can use cargo to generate a new workspace by running:

```bash
$ cargo new rau --bin
```

This gives us the following file structure:

```bash
rau/
├── Cargo.lock
├── Cargo.toml
└── src
    └── main.rs
```

### Accepting User Input (Clap your hands)

To start, we'll need to accept a few basic inputs from our user. At a minimum, we'll need to know:

1. what action we're doing
2. what file(s) we're doing it on

Instead of handling all the fun of parsing command line arguments ourselves, we can instead use [clap](https://github.com/clap-rs/clap) to handle the heavy lifting. This allows us to define all our arguments up front, and `clap` handles parsing the correct values from the user. Or, even better, we can keep our code clean by defining everything in a `.yaml` file.

This requires we enable the `yaml` feature in clap inside our `Cargo.toml`:

```toml
[dependencies]
clap = {version = "~2.27.0", features = ["yaml"]}
```

We can then create a new file called `cli.yaml` and put it in the `src` directory, right next to `main.rs`.

```bash
rau_blog/
├── Cargo.lock
├── Cargo.toml
├── rau_blog.iml
└── src
    ├── cli.yaml <---
    └── main.rs
```

For now, add the following lines to `cli.yaml`:

```yaml
name: rau
version: "1.0"
author: Brendan W
about: Simple archive utility
```

Now we can configure our `main()` function to load all the command line configurations from this `.yaml` file. 

```rust
#[macro_use]
extern crate clap;

use clap::App;

fn main() {
    let yaml = load_yaml!("cli.yaml");
    let matches = App::from_yaml(yaml).get_matches();
}
```

With all this in place, we can run `cargo run -- --help` to see all the (default) flags that `clap` sets up for us.

```bash
$ cargo run -- --help

    Finished dev [unoptimized + debuginfo] target(s) in 0.05s
     Running `target/debug/rau_blog --help`
rau 1.0
Brendan W
Simple archive utility

USAGE:
    rau

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

```

### Subcommands and Grand Designs

Because we might want rau to eventually handle different file types, I want to implement tar handling as a subcommand. This is like in Docker or other CLI applications where you can have multiple commands under the main application, each with their own individual flags.

Start by adding a new subcommand to `cli.yaml`

```yaml
#/*...*/
subcommands:
  - tar:
      about: Create a tar file
      version: "1.0"
```

To start with, we're only concerned with creating a tarball, not extracting it. The minimum a user would need to provide is the input file(s) to tar. We can add this to `cli.yaml` like so:

```yaml
#/*...*/
  - tar:
      about: Create a tar file
      version: "1.0"
      args:
        - input:
            short: i
            long: input
            help: Sets the input file/directory
            required: true
            takes_value: true
```

Clap lets us define a short flag (`-i`), a long flag (`--input`), and help text. We also set `required: true`, as we can't do anything if the user doesn't supply a file. Clap will then take care of displaying a nice, human readable error message if this parameter isn't supplied. Finally, we set `takes_value: true`, which tells clap to capture the passed value, instead of just treating the argument as a flag.

### Back to Rust

Now we've got the basics of our CLI defined, we can dive back into Rust and start handling the user input. To start with, we need to switch based on what subcommand we're given. Since we only have one subcommand, `tar`, we can add a match statement like this to `main.rs`:

```rust
fn main() {
    /*...*/
    match matches.subcommand() {
        ("tar", Some(opts)) => subcommand_tar(opts),
        _ => panic!("Unknown subcommand"),
    };
}
```

and below that, we can create a new `fn` to handle all the tar commands. The first thing we'll want to do is pull out the value we received from the user, and store it in a [PathBuf](https://doc.rust-lang.org/std/path/struct.PathBuf.html). This lets us use the input to open a file or directory and start creating a tarfile.

```rust
use clap::{App, ArgMatches};
use std::path::PathBuf;

/*...*/

fn subcommand_tar(args: &ArgMatches) -> () {
    let filepath = PathBuf::from(args.value_of_os("input").unwrap());
    println!("{:?}", filepath)
}

```

### Wrapping Up

So far, we've got a basic shell in place to accept user input, and we can easily extend it to add additional functionality as our utility grows. We've still got a long way to go before we're writing tarballs, but we have to start somewhere!

Next time, we'll be adding a new library to hold all our business logic, and take a look at the structure of a tarfile.
