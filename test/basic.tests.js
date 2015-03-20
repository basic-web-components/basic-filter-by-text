suite('basic', function() {

  this.timeout(2000);

  var container = document.getElementById('container');
  var innerHTML = document.getElementById('testData').innerHTML;

  teardown(function() {
    container.innerHTML = '';
  });

  test('default attributes', function(done) {
    var fixture = document.createElement('basic-filter-by-text');
    fixture.innerHTML = innerHTML;
    container.appendChild(fixture);
    flush(function() {
      assert.equal(fixture.filter, '');
      assert.equal(fixture.caseSensitive, false);
      done();
    });
  });

  test('set filter', function(done) {
    var fixture = document.createElement('basic-filter-by-text');
    fixture.filter = 'foo';
    fixture.innerHTML = innerHTML;
    container.appendChild(fixture);
    flush(function() {
      fixture.flattenChildNodes.forEach(function(child) {
        if (child.classList) {
          if (child.id == 'one') {
            assert.equal(child.classList.contains('filterMatch'), true);
          }
          else {
            assert.equal(child.classList.contains('filterMatch'), false);
          }
        }
      }.bind(fixture));

      done();
    });
  });

  test('set filter with case sensitivity', function(done) {
    var fixture = document.createElement('basic-filter-by-text');
    fixture.caseSensitive = true;
    fixture.filter = 'foo';
    fixture.innerHTML = innerHTML;
    container.appendChild(fixture);
    flush(function() {
      assert.equal(fixture.caseSensitive, true);
      assert.equal(fixture.filter, 'foo');
      fixture.flattenChildNodes.forEach(function(child) {
        if (child.classList) {
          assert.equal(child.classList.contains('filterMatch'), false);
        }
      });
    }.bind(fixture));

    done();
  });

});

