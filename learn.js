const lessons = document.querySelectorAll(".lesson");
const progressFill = document.getElementById("progressFill");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentLesson = 0;

function updateLesson() {
    lessons.forEach((lesson, i) => {
        lesson.classList.toggle("active", i === currentLesson);
    });

    // Update buttons
    prevBtn.disabled = currentLesson === 0;
    nextBtn.textContent = currentLesson === lessons.length - 1 ? "Finish" : "Next";

    // Update progress
    const percent = ((currentLesson + 1) / lessons.length) * 100;
    progressFill.style.width = percent + "%";
}

prevBtn.addEventListener("click", () => {
    if (currentLesson > 0) currentLesson--;
    updateLesson();
});

nextBtn.addEventListener("click", () => {
    if (currentLesson < lessons.length - 1) {
        currentLesson++;
        updateLesson();
    } else {
        alert("You’ve finished the Learning Module! Now try the Quiz or Demo.");
        window.location.href = "quiz.html"; // redirect to quiz after finishing
    }
});

// Initialize
updateLesson();
