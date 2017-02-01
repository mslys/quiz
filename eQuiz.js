src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js";

/*
 declaration of module angularjs
*/
var app = angular.module("eQuizApp", []);

/*
 controller
*/
app.controller("EQuizCtrl",['$scope', '$http', function($scope, $http){
    $http.get('package.json').then(function(eQuizData){
        $scope.eQuizData = eQuizData.data;});
    $scope.clickArr = new Array(19).fill(false);
    $scope.arr = new Array(884).fill(0);
    $scope.arrDisabled = new Array(884).fill(false);
    $scope.arrStyles = new Array(884).fill('default');
    $scope.selectedQuestionsArr = new Array(21).fill(0);
    $scope.arrDisplay = new Array(4).fill('none');
    $scope.arrDisplay[0] = 'initial';
    $scope.questionIndex = 0;
    $scope.points = 0;

    /*
     function is used to check the answer when the button is pressed
     parameters:
     A_ansNum - number of the answer
     A_questionNum - number of the question
     A_initialIndexNum - index in the array of answers, from which the used values begin
    */
    $scope.checkAns = function(A_ansNum, A_questionNum, A_initialIndexNum){

        var ansNum = A_ansNum + A_initialIndexNum;
        var questionNum = A_questionNum;
        var clickedAns = $scope.arr[ansNum];
        if(clickedAns == questionNum){
            $scope.arrStyles[ansNum] = "correct";
        }
        else{
            $scope.test = 0;
            $scope.arrStyles[ansNum] = "incorrect";
            for (var i = 0; i<4; i++){
                if($scope.arr[i + A_questionNum*4] == questionNum){
                    $scope.arrStyles[i + A_questionNum*4] = "correct";
                }
            }
        }
            $scope.arrDisabled[A_questionNu] = true;
    };

    /*
      function that draws correct anwswer and the changes and refreshes the state of answer when you press a button
      parameters:
      A_maxAnsIdx - maximum index in the array of the answers
      A_minAnsIdx - minimum index in the array of the answers
      A_btnNum - number of the button
     */
    $scope.randomizeArr1 = function(A_maxAnsIdx, A_minAnsIdx, A_btnNum){
        var buttonNumber = A_btnNum;
        $scope.clickArr[buttonNumber-1] = !$scope.clickArr[buttonNumber-1];
        if( (($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 1)) ||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 2))
        ||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 3))||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 4))
        ||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 5))||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 6))
        ||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 7))||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 8))
        ||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 9))||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 10))
        ||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 11))||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 12))
        ||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 13))||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 14))
        ||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 15))||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 16))
        ||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 17))||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 18))
        ||(($scope.clickArr[buttonNumber-1] == false) && (buttonNumber === 19))){
            for(var i = A_minAnsIdx; i <= A_maxAnsIdx; i++) {
                $scope.arrStyles[0 + 4*i] = "default";
                $scope.arrStyles[1 + 4*i] = "default";
                $scope.arrStyles[2 + 4*i] = "default";
                $scope.arrStyles[3 + 4*i] = "default";
                $scope.arrDisabled[i] = false;
            };
            return;
        }
        var ans = false;
        var numDiff = true;
        var i, j, k, n = 0;
        var tempValue = 0;
        var max = A_maxAnsIdx;
        var min = A_minAnsIdx;
        var length = max - min;
        for(i = 0; i<(length+1); i++){
            for(j=0; j<4; j++){
                numDiff = true;
                while(numDiff == true){
                    tempValue = (Math.floor(Math.random() * (max - min + 1)) + min);
                    $scope.arr[4*min + 4*i + j] = tempValue;
                    numDiff = false;
                    if(tempValue == (i + min)){
                        ans = true;
                    };
                    for(k=0; k<j; k++){
                        if($scope.arr[4*min + 4*i + k] == tempValue){
                            numDiff = true;
                        };
                    };
                };
            };
            if(ans == false){
                n = (Math.floor(Math.random() * (3 - 0 + 1)) + 0);
                $scope.arr[4*min + 4*i + n] = (i+min);
            };
            ans = false;
        };
    };

    /*
     function that randomizes questions for the point quiz
     */
    $scope.randomizeArr2 = function(){
        $scope.points = 0;
        var ans = false;
        var numDiff = true;
        var i, j, k, n = 0;
        var tempValue = 0;
        for(i = 0; i<(220); i++){
            for(j=0; j<4; j++){
                numDiff = true;
                while(numDiff == true){
                    tempValue = (Math.floor(Math.random()*(220)));
                    $scope.arr[4*i + j] = tempValue;
                    numDiff = false;
                    if(tempValue == (i)){
                        ans = true;
                    };
                    for(k=0; k<j; k++){
                        if($scope.arr[4*i + k] == tempValue){
                            numDiff = true;
                        };
                    };
                };
            };
            if(ans == false){
                n = (Math.floor(Math.random()*(4)));
                $scope.arr[4*i + n] = i;
            };
            ans = false;
        };

        var randomizedQuestionNum = 0;
        var Repeat = true;
        for(var i = 0; i<20; i++) {
            randomizedQuestionNum = (Math.floor(Math.random()*(220)));
            for (var j = 0; j < i; j++) {
                while (Repeat) {
                    randomizedQuestionNum = (Math.floor(Math.random()*(220)));
                    Repeat = false;
                    for (var k=0; k<i; k++) {
                        if ($scope.selectedQuestionsArr[k] == randomizedQuestionNum) {
                            Repeat = true;
                        }
                    }
                }
            }
            $scope.selectedQuestionsArr[i] = randomizedQuestionNum;
        }
        $scope.arrDisplay[0] = 'none'; //startButton
        $scope.arrDisplay[2] = 'block'; //questions
    };

    /*
     function is responsible for the next in line question in the point quiz
     */
    $scope.nextQuestion = function(A_clickedAns){
        var questionNum = $scope.selectedQuestionsArr[$scope.questionIndex];
        var clickedAns = $scope.arr[A_clickedAns + 4*$scope.selectedQuestionsArr[$scope.questionIndex]];
        if(clickedAns == questionNum){
            $scope.points = $scope.points + 1;
        }
        $scope.questionIndex = $scope.questionIndex +1;
        if($scope.questionIndex > 19){
            //zakonczenie quizu
            $scope.questionIndex = 0;
            $scope.arrDisplay[0] = 'block'; //startButton
            $scope.arrDisplay[1] = 'block'; //quizFeedback
            $scope.arrDisplay[2] = 'none'; //questions
        }
    };
}]);

