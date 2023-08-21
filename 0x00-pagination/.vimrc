" Enable line numbers
set number

" Enable syntax highlighting
syntax enable

" Set the color scheme
colorscheme desert

" Set the tab width to 4 spaces
set tabstop=4
set shiftwidth=4
set expandtab

" Show line and column number in the status line
set ruler

" Show matching parentheses/brackets
set showmatch

" Enable incremental search
set incsearch

" Ignore case when searching
set ignorecase

" Highlight search results as you type
set hlsearch

" Automatically wrap long lines
set wrap

" Enable mouse support
set mouse=a

" Display line and column number in the status line
set ruler

" Display file type in the status line
set statusline=%F%h%m%r%=%-14.(%l,%c%V%)\ %P

" Enable auto-indentation
set autoindent

" Enable line wrap
set wrap

" Show hidden characters (tabs, trailing spaces)
set list
set listchars=tab:→\ ,trail:·

" Set the color scheme (replace 'desert' with your preferred scheme)
colorscheme desert

" Enable syntax highlighting
syntax enable

" Enable line wrapping
set wrap

" Set text width for automatic line wrapping
set textwidth=80

" Enable mouse support
set mouse=a

" Enable line highlighting in insert mode
set cursorline

" Enable line numbers and relative line numbers
set number relativenumber

" Enable line wrap guide at a specific column
set colorcolumn=80

" Highlight current line
set cursorline

" Enable spell checking
set spell

" Set the spell language (replace 'en' with your preferred language)
set spelllang=en

" Enable auto-complete suggestions
set complete+=kspell

" Enable line folding
set foldmethod=indent
set foldlevel=1

" Enable auto-save and backup
set autowrite
set backup

" Set the clipboard to use the system clipboard
set clipboard=unnamedplus

" Customize the leader key (replace '\' with your preferred key)
let mapleader = "\<Space>"

" Map F2 to toggle line numbers
nnoremap <F2> :set invnumber<CR>

" Map F3 to toggle paste mode
nnoremap <F3> :set invpaste paste?<CR>

" Map F4 to save and exit
nnoremap <F4> :wq<CR>

" Map F5 to toggle spell checking
nnoremap <F5> :set invspell<CR>

" Map F9 to run current file as a script
nnoremap <F9> :!python3 %<CR>

