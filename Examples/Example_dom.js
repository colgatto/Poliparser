let Poliparser = require('..');

let data = `
<html>
	<head>
		<title>prova</title>
	</head>
	<body>
		<a href="link1.html" class="hiper">hello</a> world<br>
		<a href="link2.html" class="hiper" data-label="byebye">bye</a> world<br>
		<a href="link3.html" class="not-hiper" data-label="adios">ciao3</a> world<br>
	</body>
</html>
`;

let p_link = new Poliparser({
	//get attribute href from all tag <a> with class "hiper"
	f: 'dom',
	value: 'a.hiper',
	attr: 'href'
});
let p_label = new Poliparser({
	//get attribute href and data-label from all tag <a>
	f: 'dom',
	value: 'a',
	attr: ['href' , 'data-label']
});

console.log(p_link.run(data));
console.log(p_label.run(data));