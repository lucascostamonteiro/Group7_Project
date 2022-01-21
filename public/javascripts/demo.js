const demoButton = document.querySelector('.demo-user-button');
demoButton.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("hello")
    const res = await fetch('/demo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    })
})
