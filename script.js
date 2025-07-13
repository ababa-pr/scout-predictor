// DOM要素の取得
const universityInput = document.getElementById('university-name');
const valueButtons = document.querySelectorAll('.value-button');
const diagnoseButton = document.getElementById('diagnose-button');
const backButton = document.querySelector('.back-button');

// 選択された価値観を保存する配列
let selectedValues = [];

// 価値観ボタンのクリックイベント
valueButtons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        
        if (this.classList.contains('selected')) {
            // 選択解除
            this.classList.remove('selected');
            selectedValues = selectedValues.filter(v => v !== value);
        } else {
            // 選択
            this.classList.add('selected');
            selectedValues.push(value);
        }
        
        // 診断ボタンの有効/無効を更新
        updateDiagnoseButton();
    });
});

// 診断ボタンの有効/無効を更新する関数
function updateDiagnoseButton() {
    const universityName = universityInput.value.trim();
    const hasSelectedValues = selectedValues.length > 0;
    
    // 大学名が入力されていて、価値観が1つ以上選択されている場合に有効化
    if (universityName && hasSelectedValues) {
        diagnoseButton.disabled = false;
    } else {
        diagnoseButton.disabled = true;
    }
}

// 大学名入力フィールドの変更イベント
universityInput.addEventListener('input', updateDiagnoseButton);

// 診断ボタンのクリックイベント
diagnoseButton.addEventListener('click', function() {
    const universityName = universityInput.value.trim();
    
    if (universityName && selectedValues.length > 0) {
        // 診断データを作成
        const diagnosisData = {
            university: universityName,
            values: selectedValues,
            timestamp: new Date().toISOString()
        };
        
        // ローカルストレージに保存（実際のアプリではAPIに送信）
        localStorage.setItem('diagnosisData', JSON.stringify(diagnosisData));
        
        // 診断結果ページへ遷移
        window.location.href = 'result.html';
    }
});

// 戻るボタンのクリックイベント
backButton.addEventListener('click', function() {
    // 前のページに戻る（実装時は適切なナビゲーション）
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // 履歴がない場合はホームへ（実装時は適切なURL）
        window.location.href = '/';
    }
});

// 価値観のラベルを取得する関数
function getValueLabels(values) {
    const labels = {
        growth: '成長できる環境',
        diversity: '多様な働き方',
        stability: '安定した収益性',
        recognition: '会社の知名度',
        education: '教育体制の充実度'
    };
    
    return values.map(value => labels[value] || value);
}

// ページロード時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 診断ボタンを初期状態で無効化
    diagnoseButton.disabled = true;
    
    // 保存されたデータがあれば復元（オプション）
    const savedData = localStorage.getItem('diagnosisData');
    if (savedData) {
        const data = JSON.parse(savedData);
        // 必要に応じて前回の入力を復元
        console.log('前回の診断データ:', data);
    }
}); 