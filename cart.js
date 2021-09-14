var addToCartButton = document.querySelectorAll('.btn');

var product = [
    {
        name: 'Album 1',
        tag: 'album1',
        price: 12.99,
        incart: 0
    },
    {
        name: 'Album 2',
        tag: 'album2',
        price: 14.99,
        incart: 0
    },
    {
        name: 'Album 3',
        tag: 'album3',
        price: 9.99,
        incart: 0
    },
    {
        name: 'Album 4',
        tag: 'album4',
        price: 19.99,
        incart: 0
    },
    {
        name: 'T-shirt',
        tag: 'tshirt',
        price: 19.99,
        incart: 0
    },
    {
        name: 'Coffee Cup',
        tag: '',
        price: 6.99,
        incart: 0
    }

]

for (var i = 0; i < addToCartButton.length; i++) {
    addToCartButton[i].addEventListener('click', () => {
        cardNumbers();
    })
}

