addEventListener('hello', function(resolve, reject, args) {
  console.log(args.data+"bob");
  resolve({res:"Ok l don't know what to do anymore but monitor maybe the size of the data leak?"});
});