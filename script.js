let interviewList = [];
let rejectionList = [];

let currentStatus = 'All'

let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');


const allCardSection = document.getElementById('allCards');
// console.log(allCardSection.children.length);

const mainContainer = document.querySelector('main');

const filterSection = document.getElementById('filter-section');

// console.log(mainContainer);

function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectionList.length;
}
calculateCount();

function toggleStyle(id) {
    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');

    allFilterBtn.classList.add('btn-soft');
    interviewFilterBtn.classList.add('btn-soft');
    rejectedFilterBtn.classList.add('btn-soft');

    const selectedBtn = document.getElementById(id);
    currentStatus = id;
    selectedBtn.classList.add('bg-[#3B82F6]', 'text-white');

    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
    } else if (id = 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else if(id == 'rejected-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejection();
    }
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode;
        const jobCompany = parentNode.querySelector('.job-company').innerText;
        const jobPost = parentNode.querySelector('.job-post').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const jobStatus = parentNode.querySelector('.job-status').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        parentNode.querySelector('.job-status').innerText = 'Interview';


        const cardInfo = {
            jobCompany,
            jobPost,
            jobType,
            jobStatus, 
            jobDescription
        }

        const interviewExist = interviewList.find(item => item.jobCompany == cardInfo.jobCompany);

        if (!interviewExist) {
            interviewList.push(cardInfo);
        }
        rejectionList = rejectionList.filter(item => item.jobCompany != cardInfo.jobCompany)
        calculateCount();
        renderInterview();

    }else if (event.target.classList.contains('rejtected-btn')) {
        const parentNode = event.target.parentNode.parentNode;
        const jobCompany = parentNode.querySelector('.job-company').innerText;
        const jobPost = parentNode.querySelector('.job-post').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const jobStatus = parentNode.querySelector('.job-status').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        parentNode.querySelector('.job-status').innerText = 'Rejected';


        const cardInfo = {
            jobCompany,
            jobPost,
            jobType,
            jobStatus, 
            jobDescription
        }

        const rejectionExist = rejectionList.find(item => item.jobCompany == cardInfo.jobCompany);

        if (!rejectionExist) {
           rejectionList.push(cardInfo);
        }
        interviewList = interviewList.filter(item => item.jobCompany != cardInfo.jobCompany)
       
        if(currentStatus == 'interview-filter-btn'){
            renderRejection();
        }
       
        calculateCount();
        

    }

})

function renderInterview() {
    filterSection.innerHTML = '';
    for (let interview of interviewList) {
        console.log(interview);
        let div = document.createElement('div');
        div.className = 'flex justify-between bg-base-100 rounded-md';
        div.innerHTML = `<div class="card px-5 py-10 ">
                    <h1 class="job-company text-black font-bold text-2xl mb-2">${interview.jobCompany}</h1>
                    <p class="job-post mb-5 text-gray-500">${interview.jobPost}</p>
                    <p class="job-type mb-5 text-gray-500 text-sm">${interview.jobType}</p>
                    <div class="job-status flex gap-4 space-5">
                    
                         <button class="interview-btn-status btn btn-outline btn-success ">Interview </button>
                        <button class="rejtected-btn-status btn btn-outline btn-error">Rejected</button>
                    </div>
                    <p class="job-description my-3 text-[#323B49]">${interview.jobDescription}</p>
                    <div class="flex gap-4">
                        <button class="interview-btn btn btn-outline btn-success">Interview </button>
                        <button class="rejtected-btn btn btn-outline btn-error">Rejected</button>
                    </div>
                </div>

                <div class="p-10">
                    <i class="fa-regular fa-trash-can"></i>
                </div>
        `;
        filterSection.appendChild(div);
    }
}

function renderRejection() {
    filterSection.innerHTML = '';
    for (let rejection of rejectionList) {
        
        let div = document.createElement('div');
        div.className = 'flex justify-between bg-base-100 rounded-md';
        div.innerHTML = `<div class="card px-5 py-10 ">
                    <h1 class="job-company text-black font-bold text-2xl mb-2">${rejection.jobCompany}</h1>
                    <p class="job-post mb-5 text-gray-500">${rejection.jobPost}</p>
                    <p class="job-type mb-5 text-gray-500 text-sm">${rejection.jobType}</p>
                    <div class="job-status flex gap-4 space-5">
                    
                         <button class="interview-btn-status btn btn-outline btn-success ">Interview </button>
                        <button class="rejtected-btn-status btn btn-outline btn-error">Rejected</button>
                    </div>
                    <p class="job-description my-3 text-[#323B49]">${rejection.jobDescription}</p>
                    <div class="flex gap-4">
                        <button class="interview-btn btn btn-outline btn-success">Interview </button>
                        <button class="rejtected-btn btn btn-outline btn-error">Rejected</button>
                    </div>
                </div>

                <div class="p-10">
                    <i class="fa-regular fa-trash-can"></i>
                </div>
        `;
        filterSection.appendChild(div);
    }
}