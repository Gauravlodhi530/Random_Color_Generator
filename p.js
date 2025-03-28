const getcolor = () => {
    const randomnymber = Math.floor(Math.random() * 16777215);
    const hex = '#' + randomnymber.toString(16);
    console.log(hex);
}

document.querySelector('.btn').addEventListener('click', getcolor);