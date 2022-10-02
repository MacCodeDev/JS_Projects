document.querySelector("#send").addEventListener("click",test);

function test()
{
    const arr = Array();
    const container = document.querySelectorAll(".inputs");
    for(let i = 0; i < container.length; i++)
    {
        const a = container[i];
        arr[i] = parseInt(a.value);
    }
    document.querySelector('#min').innerHTML = "Min: " + Math.min(...arr);
    document.querySelector('#max').innerHTML = "Max: " + Math.max(...arr);
    document.querySelector('#sum').innerHTML = "Sum: " + arr.reduce((a, b) => a + b, 0);
    document.querySelector('#avg').innerHTML = "Avg: " + arr.reduce((a, b) => a + b, 0) / arr.length;
    console.log(arr.reduce((a, b) => a + b, 0));
    console.log(arr);
    console.log(container.values());
}