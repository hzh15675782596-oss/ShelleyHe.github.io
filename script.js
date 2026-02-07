    const fullContent = card.querySelector('.growth-full');
    const icon = button.querySelector('i');
    if (fullContent.classList.contains('hidden')) {
        fullContent.classList.remove('hidden');
        button.innerHTML = '收起 <i class="fas fa-chevron-up"></i>';
    } else {
        fullContent.classList.add('hidden');
        button.innerHTML = '展开 <i class="fas fa-chevron-down"></i>';
    }
}

