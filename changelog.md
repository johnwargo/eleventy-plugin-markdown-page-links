# Changelog

## v0.0.14 - January 10, 2026

Added main property to the project's `package.json` file. 

## v0.0.13 - January 10, 2026

Fixed a bug where the shortcut would generate the list if the page had no links at all. The code checked to see if it had at least the minimum number of links, but not that there were more than 0 links. 

So, I changed this:

``` ts
if (links.length >= minimumLinks!) {

}
```

to this:

``` ts
if (links.length > 0 && links.length >= minimumLinks!) {

}
```

Added a `no-links` page to test/demonstrate this.

## v0.0.2 through v0.0.12 - January 9, 2026

I always find that I have to make a few tweaks to a project's configuration and/or code and readme file to make the package just right. In this case, I burned a bunch of patch versions getting past npm's token changes. I was using a `zx` script to publish, but due to the login requirements for npm publish, I couldn't use it anymore.

## v0.0.1 - January 9, 2026

Initial release.
