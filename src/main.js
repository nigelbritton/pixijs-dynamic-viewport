/**
 * Created by nigel.britton on 30/04/2018.
 */

function GameEngine(settings) {
    PIXI.utils.skipHello();
    this.options = {
        height: 768,
        width: 1024,
    };
    for (let attrname in settings) { this.options[attrname] = settings[attrname]; }
    this.view = document.getElementById(this.options.id);
    this.renderer = PIXI.autoDetectRenderer(this.options.width, this.options.height, {
        backgroundColor : 0x000000,
        view: this.view
    });
    this.stage = new PIXI.Container();

    let date = new Date();
    this.currentTimeStamp = new PIXI.Text(date.getTime(), { fontFamily : 'Arial', fontSize: 12, fill : 0xffffff, align : 'right'});
    this.currentTimeStamp.x = this.options.width - 16;
    this.currentTimeStamp.y = this.options.height - 16;
    this.currentTimeStamp.anchor.x = 1;
    this.currentTimeStamp.anchor.y = 1;
    this.stage.addChild(this.currentTimeStamp);
}
GameEngine.constructor = GameEngine();
GameEngine.prototype.animate = function () {
    let self = this;
    requestAnimationFrame(function(){self.animate()});
    let date = new Date();
    this.currentTimeStamp.text = date.getTime();
    this.renderer.render(this.stage);
};
GameEngine.prototype.init = function () {
    let self = this;
    this.animate();
    this.resizeApplication();
    window.addEventListener("resize", function(){ self.resizeApplication(); });
    window.addEventListener("deviceOrientation", function(){ self.resizeApplication(); });
};
GameEngine.prototype.resizeApplication = function () {
    this.options = {
        height: document.getElementById('applicationStage').clientHeight || 768,
        width: document.getElementById('applicationStage').clientWidth || 1024
    };
    this.currentTimeStamp.x = this.options.width - 16;
    this.currentTimeStamp.y = this.options.height - 16;
    this.renderer.resize(this.options.width,this.options.height);
};