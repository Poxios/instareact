import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };

var firebaseConfig = {
    apiKey: "AIzaSyCvi9kvYi4xdHQ6EDLrIMHLToh66Y0IZ4s",
    authDomain: "xeft-dd2b5.firebaseapp.com",
    databaseURL: "https://xeft-dd2b5.firebaseio.com",
    projectId: "xeft-dd2b5",
    storageBucket: "xeft-dd2b5.appspot.com",
    messagingSenderId: "202925315793",
    appId: "1:202925315793:web:4fdf72575574c254ff97f0",
    measurementId: "G-GNTK45X4XX"
  };