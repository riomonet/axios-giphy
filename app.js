console.log("Let's get this party started!");

const form = document.querySelector('form');
const button = document.querySelector('button');
const input = document.querySelector('input');
const url = "https://api.giphy.com/v1/gifs/search";
const divMain = document.querySelector('#choose-image');
const list = document.querySelector('#perma-list');


//catch error if no 


form.addEventListener('click', async function(evt) {
    evt.preventDefault();

    let index = 0;
    
    if (evt.target === button) {
	let giph = await axios.get(url, {params: {api_key: "8NNY9LkVViIuOtpioQFKXptvAkR4ic6T", q: `${input.value}` }});
	await changeImage(giph, index);

	document.onkeydown = function () {
	    
	    let key = window.event.key

    	    if (key == 'ArrowLeft' && index > 0)
		index--;

	    else if (key == 'ArrowRight' && index < (giph.data.data.length - 1))
		index++;

	    changeImage(giph,index);
	}
    }
    input.value = '';

});

    $('#choose-image').on('click', 'img', function (evt) {
	evt.preventDefault();
	let newImage = document.createElement('img');
	let source = this.getAttribute('src');
	newImage.setAttribute('src', source);
	list.append(newImage);
    });



function changeImage(giph,index) {
    
    $('#choose-image').children().remove();
    let img = document.createElement('img');
    img.setAttribute("src","");
    img.setAttribute("src", giph.data.data[`${index}`].images.fixed_height.url);
    divMain.append(img);
}

$('#perma-list').on('click','img',function () {
    $(this).remove();
});
