let Multiparser = require('..');

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

let m = new Multiparser({
	link: {
		//get attribute href from all tag <a> with class "hiper"
		f: 'dom',
		value: 'a.hiper',
		attr: 'href'
	},
	link_and_label: {
		//get attribute href and data-label from all tag <a>
		f: 'dom',
		value: 'a',
		attr: ['href' , 'data-label']
	}
});

let output = m.run(data);

console.log(output);