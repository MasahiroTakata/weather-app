import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error('エラーが発生しました:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) { // エラーがあった場合
      console.log(this.props.errorMessage); // 呼ばれた
      return <div>{this.props.errorMessage}</div>; // エラーメッセージの表示
    }

    return this.props.children;
  }
}

export default ErrorBoundary;