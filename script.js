//todo: add event listener to the button to work if enter key is pressed

const btnElement = document.getElementById('btn');
const errorMessageElement = document.getElementById('errorMessage');
const galleryElement = document.getElementById('gallery');

async function fetchImage() {
    /*
    1) Register on unsplash
    2) go to https://unsplash.com/oauth/applications 
    and create an new application
    3) copy paste the access key after client_id=
    */

    const inputValue = document.getElementById('input').value;

    if (inputValue > 10 || inputValue < 1) {
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerHTML = 'Please enter a number between 1 and 10';
        return;
    }

    imgs = "";

    try {
        btnElement.style.display = 'none';
        // hide the get photos button

        const loading = `<img src="https://i.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.webp" alt="loading">`;
        galleryElement.innerHTML = loading;

        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=CWEPrVHOu23FWoAXGFtGl2Twnvw2WQtLUHVis0hMSG8`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    data.forEach((pic) => {
                        console.log(pic);
                        console.log(pic.urls);
                        console.log(pic.urls.small);
                        imgs += `<img src="${pic.urls.small}" alt="image">`;

                        galleryElement.style.display = "block";
                        galleryElement.innerHTML = imgs;
                        btnElement.style.display = 'block';
                        // bring back the get photos button

                        // we wait till we get the data and then we remove error message
                        errorMessageElement.style.display = 'none';
                    });
                }
            })

    } catch (error) {
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerHTML = `Something went wrong.<br>Please try again later!!!<br>${error}`;

        btnElement.style.display = 'block';
        // bring back the get photos button

        galleryElement.style.display = "none";
    }
    //* try-catch doesn't work if client_id is wrong
}

btnElement.addEventListener('click', fetchImage);