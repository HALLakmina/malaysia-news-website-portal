import React from 'react'

const FullNewsCard = ({news={}, category}) => {
  const timeExtra = (s)=>{
    function z(n){return (n<10?'0':'')+ +n}
    var b = s?.split(/\D/);
    var h = b[3]%12 || 12;
    var ap = b[3] < 12? 'AM':'PM';
    return z(h) + ':' + z(b[4]) + ' ' + ap;
  }
  return (
    <div className="w-100">
          <div className="p-2 m-2">
              <p className="heading-font-4">{news.topic}</p>
              <div>
                  <p className='body-font-5'>{news && news?.createdAt?.split("T",1)}</p>
                  <p className='body-font-5'>{news.createdAt && timeExtra(news.createdAt)}</p>
              </div>
              <img src={`${process.env.REACT_APP_API_URL}/${news?.image?.storageName}`} alt="" className='w-full h-auto'/>
              <p className='body-font-4'>
                  {news.description}
              </p>
          </div>
    </div>
  )
}

export default FullNewsCard