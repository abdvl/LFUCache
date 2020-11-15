class LFUCache {

  constructor(capcity){
    this.capcity = capcity;
    this.size = 0;
    this.keyToValue = {};
    this.keyToFreq = {};
    this.freqToKey = new Map();
  }
  
  put(key,value) {
    
    // if key exist, just update the frequence
    if(this.keyToValue[key]){
    
      this.keyToValue[key] = value;
    
      this._updateKeyFreq(key);
      
    }else{
      
      // check size
      if(this.size == this.capcity){
        this.removeLU();

      }
      
      //store
      this.keyToValue[key] = value;
      
      this.size++;
      
      this._updateKeyFreq(key);
    
    }
    
    
    return value;
  
  }
  
  
  get(key) {
    
    if(this.keyToValue[key]){
      this._updateKeyFreq(key)
      return this.keyToValue[key];
    }
    
    return null
  }
  
  // remove last LFU item
  removeLU(){
    
    // find lowest ready map
    let lastFreq;
    for(const [key, freq] of this.freqToKey){
    
      if(freq.size != 0) {
        lastFreq = freq;
        break;
      }
      
    }
    
    // find the first key
    const oldKey = Array.from(lastFreq.keys())[0]
    
    // delete reference
    lastFreq.delete(oldKey);
    delete this.keyToValue[oldKey];
    delete this.keyToFreq[oldKey];
    
    this.size--;
    
    
  }
  
  _updateKeyFreq(key){
    
    // init
    if(!this.keyToFreq[key]){
      this.keyToFreq[key] = 0;
    }
    
    const freq = ++this.keyToFreq[key];
    
    
    // update freqToKey
    if(!this.freqToKey.has(freq)){
      this.freqToKey.set(freq, new Map())
    }
    
    
    this.freqToKey.get(freq).set(key, freq);    
  
    
    //remove old reference
    if(this.freqToKey.has(freq -1)) {
      if(this.freqToKey.get(freq -1).has(key)){
        this.freqToKey.get(freq -1).delete(key)
      }
      
    }
  
  }
  

}
