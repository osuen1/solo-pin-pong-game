var panel = document.getElementById("pan");
var ball = document.getElementById("ball");
var cont = document.getElementById("cont");
var scope = document.getElementById("scope")

var contSize = cont.getBoundingClientRect();
var panelSize = panel.getBoundingClientRect();

document.addEventListener('keydown', function(event) {
    var contSize = cont.getBoundingClientRect();
    var panelSize = panel.getBoundingClientRect();

    var style = window.getComputedStyle(panel);
    var step = 10;
    var left = parseInt(style.left);

    switch(event.code) {
        case 'KeyA':
            if (left - step >= 0) {
                panel.style.left = (left - step) + 'px';
            }
            break;
        case 'KeyD':
            if (left + step + panelSize.width <= contSize.width) {
                panel.style.left = (left + step) + 'px';
            }
            break;
    }
})

function startGame() {
    var ballHeight = ball.clientHeight;
    var ballWidth = ball.clientWidth;
    var contHeight = cont.clientHeight;
    var contWidth = cont.clientWidth;
    var posX = contWidth / 2 - ballWidth / 2; // Центрируем мяч по горизонтали
    var posY = 1; // Начальная вертикальная позиция
    var speedX = 2;
    var speedY = 2;
    var scopes = 0;

    var id = setInterval(frame, 10);

    function frame() {
        var ballRect = ball.getBoundingClientRect();
        var panelRect = panel.getBoundingClientRect();
        if (posY + ballHeight >= contHeight) { // столкновение с нижней границей контейнера
            clearInterval(id);
            alert("Game over! Your scope: " + scopes)
        } else {
            if (
                ballRect.bottom >= panelRect.top &&
                ballRect.right >= panelRect.left &&
                ballRect.left <= panelRect.right
            ) {
                // Генерируем случайное направление
                var randomAngle = (Math.random() - 0.5) * Math.PI; // Значение от -π/2 до π/2
                var speedMagnitude = Math.sqrt(speedX * speedX + speedY * speedY); // Текущая скорость
                speedX = speedMagnitude * Math.cos(randomAngle); // Новое направление по горизонтали
                speedY = speedMagnitude * Math.sin(randomAngle); // Новое направление по вертикали
                speedY = -speedY; // Меняем вертикальное направление
                
                scopes += 1;
                scope.innerHTML = "Your scope: " + scopes;
            }

            if (ballRect.top <= cont.getBoundingClientRect().top) { // столкновение с верхней границей контейнера
                speedY = -speedY;
            }

            if (posX + ballWidth >= contWidth || posX <= 0) { // столкновение с боковыми границами контейнера
                speedX = -speedX;
            }

            posX += speedX;
            posY += speedY;

            ball.style.left = posX + 'px';
            ball.style.top = posY + 'px';
        }
    }
}