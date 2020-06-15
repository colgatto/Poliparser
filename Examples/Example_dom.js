let Poliparser = require('..');

let data = `
<html>
	<head>
		<title>titolo di prova</title>
	</head>
	<body>
		<a href="link1.html" class="hiper">hello</a> world<br>
		<a href="link2.html" class="hiper" data-label="byebye">bye</a> world<br>
		<a href="link3.html" class="not-hiper" data-label="adios">ciao3</a> world<br>
		<div>
			<p>testo di prova</p>
			<p>secondo&nbsp;testo&nbsp;di&nbsp;prova</p>
		</div>
	</body>
</html>
`;

let p_text = new Poliparser([{
	m: 'dom',
	value: 'div',
	firstOnly: true
},{
	m: 'dom',
	value: 'p',
	innerHTML: true
}]);
console.log("text from <p> inside first <div>:");
console.log(p_text.parse(data));

let href = new Poliparser({
	m: 'dom',
	value: 'a.hiper',
	attr: 'href',
	firstOnly: true
});
console.log("\nhref attribute from first <a> with class hiper:");
console.log(href.parse(data));

let href_label = new Poliparser({
	m: 'dom',
	value: 'a',
	attr: ['href' , 'data-label']
});
console.log("\nattribute href and data-label from all <a>:");
console.log(href_label.parse(data));
