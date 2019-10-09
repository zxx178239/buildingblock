/*
 * @Author: xxZhang
 * @Date: 2019-07-05 15:00:18
 * @Description: 音效管理器
 */

export var AudioManager = (function() {
    var instance;
    var AudioManager = function() {
        if(!instance) {
            instance = this;
            this.init();
        }
        return instance;
    };

    AudioManager.prototype.init = function() {
        this._isMusicPlaying = false;
        this._isCanPlay = null;
    };

    AudioManager.prototype.playMusic = function(INPath, INIsLoop) {
        if(this.getIsCanPlay() === 0) {
            return;
        }
        this.stopMusic();
        INPath = "sound/" + INPath;
        cc.loader.loadRes(INPath, cc.AudioClip, (err, clip) => {
            if(err) {
                g_logTool.warn("audio play error: ", INPath);
                return;
            }
            cc.audioEngine.playMusic(clip, INIsLoop);
        });
    };

    /**
     * @description: 停止音乐
     * @param : 
     * @return : 
     */
    AudioManager.prototype.stopMusic = function() {
        if(cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.stopMusic();
        }
    };

    AudioManager.prototype.pauseMusic = function() {
        if(cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.pauseMusic();
        }
    }

    AudioManager.prototype.resumeMusic = function() {
        cc.audioEngine.resumeMusic();
    }

    /**
     * @description: 播放音效
     * @param : INPath: 路径， INIsLoop：是否循环， INIsStatic：是否静态，即是否一直保存, INCallback: 回调函数
     * @return : 
     */
    AudioManager.prototype.playSound = function(INPath, INIsLoop, INIsStatic, INCallback) {
        INPath = "sound/" + INPath;
        INIsLoop = INIsLoop ? INIsLoop : false;
        INIsStatic = INIsStatic ? INIsStatic : true;
        cc.loader.loadRes(INPath, cc.AudioClip, (err, clip) => {
            if(err) {
                g_logTool.warn("play sound error: ", INPath);
                return;
            }
            let audioId = cc.audioEngine.play(clip, INIsLoop, 0.5);
            cc.audioEngine.setFinishCallback(audioId, () => {
                if(!INIsStatic) {
                    cc.audioEngine.uncache(INPath)
                    // cc.loader.releaseRes(INPath);
                }
                INCallback ? INCallback() : null;
            })
        })
    };

    /**
     * @description: 替换式播放音频，停止掉之前的音频，然后播放新的音频
     * @param : 
     * @return : 
     */
    AudioManager.prototype.replacePlaySound = function(INPath, INIsLoop, INIsStatic, INCallback) {
        cc.audioEngine.stopAllEffects();

        this.playSound(INPath, INIsLoop, INIsStatic, INCallback);
    };

    /**
     * @description: 设置是否可以播放
     * @param : 
     * @return : 
     */
    AudioManager.prototype.setIsCanPlay = function(INFlag) {
        this._isCanPlay = INFlag;
        if(INFlag === 0) {
            this.pauseMusic();
        }else {
            this.playMusic("hall_bg_music");
        }
        cc.sys.localStorage.setItem("sudoku_music_open", INFlag);
    };

    AudioManager.prototype.getIsCanPlay = function() {
        if(this._isCanPlay === null) {
            this._isCanPlay = cc.sys.localStorage.getItem("sudoku_music_open");
            this._isCanPlay = this._isCanPlay ? parseInt(this._isCanPlay) : 1;
        }
        
        return this._isCanPlay;
    }

    /**
     * @description: 停止所有的音效
     * @param : 
     * @return : 
     */
    AudioManager.prototype.stopAllEffects = function() {
        cc.audioEngine.stopAllEffects();
    };

    return AudioManager;
})();
